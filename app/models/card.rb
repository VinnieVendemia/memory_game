class Card < ApplicationRecord
	belongs_to :game

	# only support 4 cards for now
	enum symbol: [ :jack, :queen, :king, :ace ]
end
