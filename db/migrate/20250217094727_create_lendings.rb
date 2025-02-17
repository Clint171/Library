class CreateLendings < ActiveRecord::Migration[7.2]
  def change
    create_table :lendings do |t|
      t.references :book, null: false, foreign_key: true
      t.string :borrower
      t.datetime :borrowed_at
      t.datetime :returned_at

      t.timestamps
    end
  end
end
