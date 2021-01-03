import User from "~/src/model/userModel";
export default async (req, res) => {
    try {
        const book = await User.findAll();
        exeSuccess(res, book)
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

//処理成功時の処理
const exeSuccess = (res, result) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(result));
}

