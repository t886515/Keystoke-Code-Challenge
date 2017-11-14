import $ from 'jquery';
// import Cookie from 'universal-cookie';

// const cookies = new Cookie();

export const getAllUsers = (callback) => {
  $.ajax({
      type: "GET",
      url: '/allusers',
      contentType: 'application/json',
      success: (data) => {
        callback(data);
      }
  })
};


export const createUser = (username, callback) => {
  $.ajax({
    type: "POST",
    url: '/user/create',
    dataType: 'application/json',
    data: JSON.stringify({
      username: username,
      name: username,
      description: `Hi, I'm ${username}`,
      profilePicture: null
    }),
    contentType: 'application/json',
    statusCode: {
      200: function(user) {
        callback(null, JSON.parse(user.responseText));
      }
    },
    error: (err) => {
      return callback(err, null);
    }
  })
}

export const findUser = (username, callback) => {
  $.ajax({
    type: "POST",
    url: '/user/find',
    dataType: 'application/json',
    data: JSON.stringify({
      username: username
    }),
    contentType: 'application/json',
    statusCode: {
      200: function(user) {
        callback(null, JSON.parse(user.responseText));
      }
    },
    error: (err) => {
      return callback(err, null);
    }
  })
}

export const updateUser = (username, name, description, profilePicture, callback) => {
  $.ajax({
    type: "POST",
    url: '/user/update',
    dataType: 'application/json',
    data: JSON.stringify({
      username: username,
      name: name,
      description: description,
      profilePicture: profilePicture
    }),
    contentType: 'application/json',
    statusCode: {
      200: function(user) {
        callback(null, JSON.parse(user.responseText));
      }
    },
    error: (err) => {
      return callback(err, null);
    }
  })
}

// export const signOut = (callback) => {
//   $.ajax({
//     type: "GET",
//     url: '/logout',
//     contentType: 'application/json',
//     success: (data) => {
//       callback('signed out successfully');
//     }
//   })
// }

