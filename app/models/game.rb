class Game < ActiveRecord::Base

  MAX_PLAYERS = 2

  has_many :players, :dependent => :destroy


  def full?
    self.players.count == MAX_PLAYERS
  end

end
