import { connect, disconnect } from "mongoose";
import chalk from "chalk";
import Item from "../server/items/item.model";
import User from "../server/users/user.model";
import { url } from "../server/config";

(async () => {
  try {
    await connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const users = await User.find({});
    const items = await Item.find({});
    if (users.length === 0 && items.length === 0) {
      console.log(
        chalk.yellow(
          "No users or items in the database, creating sample data..."
        )
      );
      const user = new User({ name: "John Doe", course: "SOFTENG 700" });
      await user.save();
      console.log(chalk.green("Sample user successfuly created!"));
      const newItems = [
        { name: "Dimension 1", value: 0.1 },
        { name: "Dimension 2", value: 1.2 },
        { name: "Dimension 3", value: 2.5 },
        { name: "Dimension 4", value: 0.5 },
        { name: "Dimension 5", value: 5.1 },
      ];
      await Item.insertMany(newItems);
      console.log(
        chalk.green(`${newItems.length} item(s) successfuly created!`)
      );
    } else {
      console.log(
        chalk.yellow("Database already initiated, skipping populating script")
      );
    }
  } catch (error) {
    console.log(chalk.red(error));
  } finally {
    await disconnect();
  }
})();
