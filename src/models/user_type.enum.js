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

module.exports = {
  USER_TYPE: Object.freeze(user_types),
  USER_TYPE_TEXT: Object.freeze(user_type_text)
};