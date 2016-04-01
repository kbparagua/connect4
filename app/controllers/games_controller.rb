class GamesController < ApplicationController

  def new
    @form = GameForm.new Game.new
  end

  def create
    @form = GameForm.new Game.new

    if @form.validate(params[:game]) && @form.save
      raise 'yay'
    else
      render :new
    end
  end

end
