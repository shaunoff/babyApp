Accounts.onCreateUser((options, user) => {
  user.profile = options.profile
  user.following = []
  return user;
});
