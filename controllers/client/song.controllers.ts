import { Request,Response } from "express";
import Topic from "../../model/topic.model";
import Song from "../../model/songs.model";
import Singer from "../../model/singer.model";
import FavoriteSong from "../../model/favorite-songs.model";

// [GET] /songs/:slugTopic
export const index = async (req:Request,res:Response) => {
    const slugTopic:string = req.params.slugTopic;
    const topic = await Topic.findOne({slug :slugTopic,deleted:false,status:"active"});
    const songs = await Song.find({topicId :topic.id,deleted:false,status:"active"}).select("id title like avatar singerId createdAt slug");
    for (const song of songs) {
        const info = await Singer.findOne({_id :song.singerId ,deleted:false,status:"active"}).select("fullName");
        song["info"] = info;
    }
    res.render("client/pages/songs/list",{
        titlePage : topic.title,
        songs:songs
    })
}

// [GET] /songs/detail/:slugSong
export const detail = async (req:Request,res:Response) => {
    const slug:string = req.params.slugSong;
    const song = await Song.findOne({slug:slug,deleted:false,status:"active"});
    const topic = await Topic.findOne({_id:song["topicId"]}).select("title");
    const singer = await Singer.findOne({_id : song["singerId"]}).select("fullName");
    const favorite = await FavoriteSong.findOne({
        songId : song["id"],
        // user_id:res.locals.user.id
    })
    if (favorite) {
        song["favorite"] = true;
    }else { 
        song["favorite"] = false;
    }
    res.render("client/pages/songs/detail",{
        titlePage : song.title,
        song:song,
        topic:topic,
        singer:singer
    });
}

// [PATCH] /songs/like
export const like = async (req:Request,res:Response) => {
    try {
        const SongId:string = req.body.id;
        const status:string = req.body.status;
        const song = await Song.findOne({_id : SongId,deleted:false,status:"active"});
        if(song) {
            let newLike = song.like;
            switch (status) {
                case "like":
                    newLike++;
                    break;
                case "dislike":
                    newLike--;
                    break;
                default:
                    break;
            }
            await Song.updateOne({_id : SongId},{
                like : newLike
            })
            res.json({
                code:200,
                message:"Thanh Cong",
                newLike : newLike
            })
        }
    } catch (error) {
        res.json({
            code:400,
            message:"Error"
        })
    }
}

// [PATCH] /songs/favorite
export const favorite = async (req:Request,res:Response) => {
    try {
        const songId:string = req.body.id;
        const song = await Song.findOne({_id:songId,deleted:false,status:"active"});
        if(song) {
            const exitsFavoriteSong = await FavoriteSong.findOne(
                {
                    songId:songId,
                    // user_id : res.locals.user_id
                }
            )
            if(exitsFavoriteSong) {
                await FavoriteSong.deleteOne({
                        songId:songId,
                        // user_id : res.locals.user_id
                    }
                )
            }else {
                const data = {
                    songId :songId,
                    // user_id : res.locals.user.id
                }
                const SongFavorite = new FavoriteSong(data);
                await SongFavorite.save();
            }
        }
        res.json({
            code:200,
            message:"Thanh Cong"
        })
    } catch (error) {
        res.json({
            code:400,
            message:"Error"
        })
    }
}


// [GET] /songs/favorite
export const favoriteSong = async (req:Request,res:Response) => {
    const songs = await FavoriteSong.find({
        // user_id :res.locals.user.id
    })
    for (const item of songs) {
        const inforSong = await Song.findOne({_id :item.songId,deleted:false,status:"active"});
        const singer = await Singer.findOne({_id : inforSong.singerId}).select("fullName");
        item["title"] = inforSong.title;
        item["avatar"] = inforSong.avatar;
        item["singerName"] = singer.fullName;
        item["slug"] = inforSong.slug;
    }
    res.render("client/pages/songs/favorite",{
        titlePage:"Bài hát yêu thích",
        songs:songs
    })
}