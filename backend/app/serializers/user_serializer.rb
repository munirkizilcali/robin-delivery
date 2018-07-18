class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :user_type, :photo_url, :mount, :available, :location, :address
end
