class Api::UsersController < ApplicationController
  def index
    render json: User.all
  end

  def update
    if current_user.update(user_params)
      render json: current_user
    else
      render json: current_user.errors, status: 422
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :nickname, :email, :image, :friends)
    end
end
