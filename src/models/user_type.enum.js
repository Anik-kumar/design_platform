const user_types = {
  VISITOR: 1,
  DESIGNER: 2,
  CUSTOMER: 3,
  DC: 4,
  REVIEWER: 5,
  ADMIN: 6,
  SUPER_ADMIN: 7,
  ROOT_USER: 8
};

const user_type_text = {
  VISITOR: 'VISITOR',
  DESIGNER: 'DESIGNER',
  CUSTOMER: 'CUSTOMER',
  DC: 'DC',
  REVIEWER: 'REVIEWER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER ADMIN',
  ROOT_USER: 'ROOT USER'
};


function getUserTypeTextByEnum(type) {
  let type_text = null;
  switch (type) {
    case user_types.VISITOR:
      type_text = user_type_text.VISITOR
      break;
    case user_types.DESIGNER:
      type_text = user_type_text.DESIGNER
      break;
    case user_types.CUSTOMER:
      type_text = user_type_text.CUSTOMER
      break;
    case user_types.DC:
      type_text = user_type_text.DC
      break;
    case user_types.REVIEWER:
      type_text = user_type_text.REVIEWER
      break;
    case user_types.ADMIN:
      type_text = user_type_text.ADMIN
      break;
    case user_types.SUPER_ADMIN:
      type_text = user_type_text.SUPER_ADMIN
      break;
    case user_types.ROOT_USER:
      type_text = user_type_text.ROOT_USER
      break;

  }

  return type_text;
}

module.exports = {
  USER_TYPE: Object.freeze(user_types),
  USER_TYPE_TEXT: Object.freeze(user_type_text),
  getUserTypeTextByEnum: getUserTypeTextByEnum

};