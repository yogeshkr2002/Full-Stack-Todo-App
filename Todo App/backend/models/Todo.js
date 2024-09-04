import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Todo = sequelize.define("Todo", {
  todo_desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  todo_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Todo;
