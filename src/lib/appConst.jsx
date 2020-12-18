export default Object.freeze({

  //ページのURL
  URL: {
    INDEX            : "/",
    SEARCH_RESULT    : "/search-result",
    NO_IMAGE_URL     : "/no_image.jpg"
  },
  
  //APIのURL
  API: {
    BOOK : "/api/book",
    USER : "/api/user",
    AMAZON_BOOK      : "https://www.googleapis.com/books/v1/volumes",
  },
  
  //取得したいデータのタイプ
  URL_QUERY_TYPE: {
    SINGLE: "single",   //1件のデータ
    LIST:   "list"      //一覧のデータ
  },

  //取得したいデータの項目
  URL_QUERY_ITEM: {
    PAGE : "page",      //総ページ数の取得
  },

  MAX_BOOK_BY_PAGE : 10,   //1ページに表示する本の件数

  /** HTTPステータスコード */
  HTTP_STATUS_CODE: {
    REDIRECT           : 303,  //リダイレクト
    BAD_REQUEST        : 400,  //リクエストの不正
  },

  //エラーメッセージ
  ERROR_MESSAGE: {
    NOT_FOUND_DATA: "該当データがありません。"
  },

  //HTTPメソッド
  HTTP_METHOD: {
    GET     : "GET",
    POST    : "POST",
    PUT     : "PUT",
    DELETE  : "DELETE",
  },

  //エラーメッセージの表示時間(ms)
  ERROR_MESSAGE_DURATION: 2000,
});