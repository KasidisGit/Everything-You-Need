import loginImg from '../images/login-img.jpg';

export default function LoginComponent() {

  return (
    <div class="container">
      <div class="signin-content">
          <div class="signin-image">
              <img src={loginImg} alt=""/>
              <a href="/register" class="signup-image-link"><u>Create an account</u></a>
          </div>
          <div class="signin-form">
              <h2 class="form-title">Log in</h2>
              <form method="POST" class="register-form" id="login-form">
                  <div class="form-group">
                      <label for="your_name"><i class="zmdi zmdi-email"></i></label>
                      <input type="text" name="your_name" id="your_name" placeholder="Email"/>
                  </div>
                  <div class="form-group">
                      <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                      <input type="password" name="your_pass" id="your_pass" placeholder="Password"/>
                  </div>
                  <div class="form-group">
                      <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                      <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                  </div>
                  <div class="form-group form-button">
                      <input type="submit" name="signin" id="signin" class="form-submit" value="Log in"/>
                  </div>
              </form>
          </div>
      </div>
    </div>
  );
}
