class ChallengersController < ApplicationController

  def new
    @form = ChallengerForm.new Player.new
  end

  def create
    @form = ChallengerForm.new Player.new

    if @form.validate(params[:challenger]) && @form.save
      redirect_to @form.model.game
    else
      render :new
    end
  end

end
