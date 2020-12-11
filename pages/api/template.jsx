import Book from "@model/bookModel";
export default async (req, res) => {
  console.log("aa")
  const [book, created] = await Book.findOrCreate({
    where : {
        amazon_id: "1"
    },
    defaults: {
        title : "1",
        amazon_id: "1",
        image_url: "a",
        page: 1
    }
  });
  // Book.sync({force:true})
  // await Book.findOne()
};