class GameForm < Reform::Form

  property :player_name,
    :virtual => true,
    :validates => {:presence => true}

  property :uid, :readable => false

  validate :unique_uid

  def save
    success = super
    self.create_initial_player if success
    success
  end

  protected

  def create_initial_player
    self.model.players.create :name => self.player_name
  end

  def unique_uid
    duplicate = true

    while duplicate do
      self.uid = SecureRandom.hex 3
      duplicate = Game.find_by_uid(self.uid).present?
    end
  end

end
