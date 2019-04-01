class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :require_login

  def current_user
    session[:user_id].nil? ? nil : User.find(session[:user_id])
  end

  def require_login
    redirect_to root_path if !current_user
  end

  private

end
