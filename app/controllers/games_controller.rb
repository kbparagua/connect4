class GamesController < ApplicationController

  def show
    @game = Game.find params[:id]
  end

  def new
    @form = GameForm.new Game.new
  end

  def create
    @form = GameForm.new Game.new

    if @form.validate(params[:game]) && @form.save
      redirect_to @form.model
    else
      render :new
    end
  end

end
