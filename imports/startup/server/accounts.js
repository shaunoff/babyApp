Accounts.onCreateUser((options, user) => {
  user.following = []
  return user;
});
