# frozen_string_literal: true

class User < ActiveRecord::Base
  serialize :friends, Array
  has_many :posts
  
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  def self.friended(ids)
    ids = ids.empty? ? [0] : ids
    User.where("id IN (?)", ids)
  end

end
