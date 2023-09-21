import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  //req.user.id, is the id we get after calling verifyToken middleware, so it checks and give the id back
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has been deleted.");
    } else {
      return next(createError(403, "You can delete only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased.");
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
  //here we uses mongodb aggregate method. basically it gonna return us random videos sample, 40 videos will be randomly returned from DB.
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    // -1 views lists most viewed videos while 1 lists less viewed videos
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

//get subscribed videos
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
        //finds allvideos of the subscribed channels.
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt)); //flat method to remove nested array into single array. sort: to view the newest videos first.
  } catch (err) {
    next(err);
  }
};

////get videos by its tags
export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  console.log(tags);
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }

  //   req.query.tags: This code extracts the tags query parameter from the incoming HTTP request. Query parameters are typically included in the URL following the ? symbol, and they are accessed using req.query.

  // .split(","): It then splits the value of the tags query parameter into an array of tags using a comma , as the delimiter. This is assuming that the tags are provided as a comma-separated list in the query parameter.
  // Video.find(...): This line uses the Mongoose find method (assuming you're using Mongoose with MongoDB) to query the database for videos. It looks for videos where the tags field contains at least one of the tags from the tags array. The $in operator is used for this purpose.

  // .limit(20): This limits the result to a maximum of 20 videos. It's common to apply pagination or limits to queries to prevent overwhelming the response with too much data.
};

////get videos by its title
export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
  //   Video.find(...): This line uses the Mongoose find method (assuming you're using Mongoose with MongoDB) to query the database for videos. It searches for videos where the title field matches the query using a case-insensitive regular expression ($regex) with the $options set to "i".

  // $regex: This operator allows you to perform a regular expression search on the title field.
  // $options: "i": The "i" option makes the regular expression search case-insensitive.
  // .limit(40): This limits the result to a maximum of 40 videos.
};
