import DB from "@model/bookModel";
export default async (req, res) => {
  DB.sync({force:true})
  await DB.findOne()
};