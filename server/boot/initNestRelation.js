module.exports = function(app, cb) {
  var Owner = app.models.Owner;
  // Enable nested endpoints like /api/Owners/:id/homes/:id/rooms
  Owner.nestRemoting('homes');

  var ownerSample = {name: 'Janny', password: '12345', email: 'me@example.com'};
  var homeSample = {type: 'house'};
  var roomSample = {size: '100'};

  Owner.create(ownerSample)
    .then(function(owner) {
      console.log('Owner created:', owner);
      owner.homes.create(homeSample)
        .then(function(home) {
          console.log('Home created: ', home);
          home.rooms.create(roomSample)
            .then(function(room) {
              console.log('Room created: ', room);
              cb();
            }).catch(function(err) {
              if (err) cb(err);
            });
        }).catch(function(err) {
          if (err) cb(err);
        });
    }).catch(function(err) {
      if (err) cb(err);
    });
}