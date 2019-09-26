class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :my_friends]
  def index
    render json: User.all
  end

  def show
    render json: @user
  end

  def update
    if current_user.update(user_params)
      render json: current_user
    else
      render json: current_user.errors, status: 422
    end
  end

  def my_friends
    binding.pry
    render json: User.friended(@user.friended)
  end

  def add_friend
    current_user.friended << params[:id].to_i
    current_user.save
  end

  private
    def user_params
      params.require(:user).permit(:name, :nickname, :email, :image, :friends)
    end

    def set_user
      @user = User.find(params[:id])
    end
end
