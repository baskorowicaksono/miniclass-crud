// Importing required Modules
require("dotenv").config();
const { link } = require("@hapi/joi");
const _ = require("lodash");
const { Miniclass } = require("../models/");

// Miniclass post controller
module.exports.addMiniclass = async(req, res, next) => {
    try{
        const nama_miniclass = req.body.nama_miniclass;
        const tipe_kelas = _.capitalize(req.body.tipe_miniclass);
        let status_program_id = 0;
        if(tipe_kelas === "Privat"){
            status_program_id = 1;
        }
        else if(tipe_kelas === "Umum"){
            status_program_id = 2;
        }
        else{
            status_program_id = undefined;
        }
        const deskripsi_miniclass = req.body.deskripsi_miniclass;
        const materi = req.body.materi_miniclass;
        const link_meeting = req.body.link_meeting;
        const persiapan = req.body.persiapan_miniclass;
        const biaya = req.body.biaya_miniclass;
        const poster_program = req.file.filename;

        const savedMiniclass = await Miniclass.create({
            nama_miniclass: nama_miniclass,
            status_program_id: status_program_id,
            poster_program: poster_program,
            deskripsi_miniclass: deskripsi_miniclass,
            materi: materi,
            link_meeting: link_meeting,
            persiapan: persiapan,
            biaya: biaya
        });
        return res.send(savedMiniclass);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
}

// Miniclass get controller, get All Miniclass
module.exports.getMiniclasses = async(req, res, next) => {
    try{
        const miniclasses = await Miniclass.findAll();
        return res.json(miniclasses);
    }
    catch(err){
        if(err){
            console.log(err);
            return res.status(500)
                .json({"message" : "Something went wrong..."});
        }
    }
}

// Miniclass get controller, get specific Miniclass based on UUID
module.exports.getMiniclass = async(req, res, next) => {
    try{
        const classId = req.params.classId;
        const miniclasses = await Miniclass.findOne({where : {uuid: classId}});
        return res.json(miniclasses);
    }
    catch(err){
        if(err){
            console.log(err);
            return res.status(500)
                .json({"message" : "Something went wrong..."});
        }
    }
}

// Miniclass update on Uploading photo file
module.exports.uploadPhoto = async(req, res, next) => {
    try{
        const classId = req.params.classId;
        await Miniclass.findOne(
            {where: {uuid: classId}
        })
        .then(record => {
            return record.update(
                {poster_program: req.file.filename}
            )
        })
        .then(record => {
            res.sendStatus(200);
        });
    } catch(err){
        if(err){
            console.log(err);
            return res.status(500)
                      .json({"message" : "Something went wrong..."});
        }
    }
}

// Miniclass update data of class
module.exports.updateClassData = async(req, res, next) => {
    try{
        const classId = req.params.classId;
        const { nama_miniclass, tipe_miniclass, deskripsi_miniclass, materi, link_meeting, persiapan, biaya } = req.body;
        let status_program_id = 0;
        if(tipe_miniclass === "Privat"){
            status_program_id = 1;
        }
        else if(tipe_miniclass === "Umum"){
            status_program_id = 2;
        }
        else{
            status_program_id = undefined;
        }

        const savedMiniclass = await Miniclass.findOne({
            where: {uuid: classId}
        })
        .then(record => {
            return record.update({
                nama_miniclass,
                status_program_id,
                deskripsi_miniclass,
                materi,
                link_meeting,
                persiapan,
                biaya
            })
        })
        .then(record => {
            res.sendStatus(200);
        });
        res.send(savedMiniclass);
    } catch(err){
        if(err){
            console.log(err);
            return res.status(500)
                      .json({"message" : "Something went wrong..."});
        }
    }
}

// Delete all miniclasses
module.exports.deleteMiniclasses = async(req, res, next) => {
    try{
        await Miniclass.destroy({
            where: {},
            force: true
        })
        res.send({
            success: true,
            message: "All miniclasses successfully destroyed"
        })
    } catch(err){
        if(err){
            console.log(err);
            return res.status(500)
                      .json({"message" : "Something went wrong..."});
        }
    }
}

// Delete specific miniclasses identified by UUID
module.exports.deleteMiniclass = async(req, res, next) => {
    try{
        const classId = req.params.classId;
        const specifiedMiniclass = await Miniclass.findOne({
            where: {uuid: classId}
        });
        await specifiedMiniclass.destroy();
        res.send({
            success: true,
            message: "The miniclass has benn deleted"
        });
    } catch(err){
        if(err){
            console.log(err);
            return res.status(500)
                      .json({message: "Something went wrong"});
        };
    }
}