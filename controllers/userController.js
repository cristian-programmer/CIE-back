const UserModel = require("./../models/userModel").UserModel;

const user = new UserModel();

async function getProfile(ids) {
  let names = [];
  console.log("ids", typeof ids);

  const array_ids =
    typeof ids === "number" ? ids.toString().split(",") : ids.split(",");

  if (array_ids.length === 1) {
    const data = await user.getUserById(array_ids[0]);
    names.push({
      name: data[0].name,
      image: data[0].image,
    });
  } else {
    for (let i = 0; i < array_ids.length; i++) {
      const data = await user.getUserById(array_ids[i]);
      names.push({ name: data[0].name, image: data[0].image });
    }
  }

  return names;
}

module.exports = {
  getUserNameById: getProfile,
};
