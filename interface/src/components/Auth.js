class Auth {
  isAuthenticated() {
    return Math.floor(new Date().getTime() / 1000) < sessionStorage.getItem('expireDate');
  }

  signIn(token) {
    var data = token.split(".")[1]
    data = JSON.parse(atob(data))
    sessionStorage.setItem('userID', data.userID);
    sessionStorage.setItem('expireDate', data.expireDate);
    sessionStorage.setItem('token', token);
    document.cookie = `token=${token}; expires=${new Date(data.expireDate*1000).toUTCString()}; path=/`;
  }

  signOut() {
    sessionStorage.clear()
  }
}

const auth = new Auth();

export default auth;
