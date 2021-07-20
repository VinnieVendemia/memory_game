class GamesController < ApplicationController
  def index

    # Only support 1 game for now.
    @game = Game.find_or_create_by(id: 1)
    if @game.cards.empty?
      0.upto(7) do |i|
        c = Card.new(symbol: (i % 4), game_id: @game.id)
        c.save!
      end
    end
  end

  def update
    game = Game.find(params['id'])

    if params[:start_over]
      game.cards.each do |card|
        card.face_up = false
        card.selected_in_turn = false
        card.save!
      end

      game.turn_active = false
      game.save!
      redirect_to root_path
      return
    end

    card = Card.find(params['card'])

    if game.turn_active
      found_match = false
      prev_card = game.cards.find_by(selected_in_turn: true)

      if prev_card.symbol == card.symbol
        prev_card.face_up = true
        card.face_up = true
        found_match = true
      end

      prev_card.selected_in_turn = false
      prev_card.save!
      card.save! if found_match

      game.turn_active = false
      game.save!

      if found_match
        render json: { card: { id: card.id }, wait_then_refresh: false }
      else
        render json: { 
                        card: { id: card.id },
                        prev_card: { id: prev_card.id },
                        wait_then_refresh: true 
                      }
      end
    else
      card.selected_in_turn = true
      card.save!

      game.turn_active = true
      game.save!

      render json: { card: { id: card.id } , wait_then_refresh: false }
    end
  end
end
