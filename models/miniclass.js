'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Miniclass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON(){
      return {...this.get(), id: undefined};
    }
  };
  Miniclass.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    nama_miniclass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status_program_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    poster_program: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deskripsi_miniclass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    materi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link_meeting: {
      type: DataTypes.STRING,
      allowNull: false
    },
    persiapan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    biaya: {
      type: DataTypes.STRING,
      allowNull: false
    },
    display_event: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
  }, {
    sequelize,
    modelName: 'Miniclass',
  });
  return Miniclass;
};