class ChallengerForm < Reform::Form

  property :game_uid, :virtual => true
  property :game_id, :readable => false
  property :name

  validates :game_uid, :name, :presence => true
  validate :game_exists
  validate :can_join_game



  protected

  def game_exists
    if self.game.present?
      self.game_id = self.game.id
    else
      self.errors.add :game_uid, 'is invalid'
    end
  end

  def can_join_game
    if self.game.try :full?
      self.errors.add :base, 'Game is full'
    end
  end

  def game
    @game ||= Game.find_by_uid self.game_uid
  end

end
