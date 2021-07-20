class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.column :symbol, :integer, default: 0
      t.column :face_up, :boolean, default: false
      t.column :selected_in_turn, :boolean, default: false
      t.column :game_id, :integer
      t.timestamps
    end

    add_foreign_key :cards, :games
  end
end
