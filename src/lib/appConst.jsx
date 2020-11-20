export default Object.freeze({
  CATEGORY_ID: {
    ENTRY: -1
  },
  SCREEN: {
    HOME     : 0,
    REGISTER : 1
  },

  URL: {
    INDEX            : "/",
    HOME             : "/home",
    TEMPLATE_INPUT   : "/template-input",
    TEMPLATE_SHOW    : "/template-show",
    SEARCH           : "/search",
    SEARCH_RESULT    : "/search-result",
    AMAZON_BOOK      : "https://www.googleapis.com/books/v1/volumes",
  },

  API: {
    TEMPLATE :"/api/template",
    CATEGORY :"/api/category",
  },
  
  /** テンプレート一覧の並び順 */
  TEMPLATE_LIST_SORT: {
    NEW : "new",
    OLD : "old",
  },

  URL_QUERY_TYPE: {
    ONE: "one",
    LIST: "list"
  },

  /** HTTPステータスコード */
  HTTP_STATUS_CODE: {
    PRECONDITION_FAILED:412, //クエリパラーメータがなかった場合
  },

  REGISTER_DATA: {
    DATE     : "memo_date",
    MEMO     : "memo",
    CATEGORY : "category_id"
  },

  SEARCH_DATA: {
    DATE_FROM  : "date_from",
    DATE_TO    : "date_to",
    KEYWORD    : "keyword",
    CATEGORY   : "category"
  },

  CATEGORY_DEFAULT: {
    KEY   : 0,
    VALUE : "メモ"
  },

  SCREEN_TITLE: {
    REGISTER : "メモ登録",
    CALENDAR : "カレンダー"
  },

  BUTTON_TITLE: {
    REGISTER : "登録"
  },
  
  HTTP_METHOD: {
    GET     : "GET",
    POST    : "POST",
    PUT     : "PUT",
    DELETE  : "DELETE",
  },

  ACTION_TYPE: {
    SET_USER : "SET_USER",
  },
});