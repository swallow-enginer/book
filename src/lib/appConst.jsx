export default Object.freeze({

  //ページのURL
  URL: {
    INDEX            : "/",
    HOME             : "/home/",
    SEARCH_RESULT    : "/search-result/",
    NO_IMAGE_URL     : "/no_image.jpg"
  },
  
  //1ページの情報
  PER_PAGE: {
    WEIGHT : 0.5,   //1ページの重さ
    HEIGHT : 0.15,  //1ページの高さ
  },
  
  //APIのURL
  API: {
    BOOK : "/api/book/",
    USER : "/api/user/",
    LOGIN : "/api/login/",
    LOGOUT : "/api/logout/",
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