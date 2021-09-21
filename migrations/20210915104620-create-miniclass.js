'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('miniclasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull : false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull : false
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('miniclasses');
  }
};