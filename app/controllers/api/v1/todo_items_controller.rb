module Api
  module V1
    class TodoItemsController < ApplicationApiController
      before_action :find_todo_item, only: [:show,:update]

      def index
        render json: TodoItem.all
      end

      def show
        render json: @todo_item
      end

      def create
        todo_item = TodoItem.new(todo_item_params)

        if todo_item.save
          renders(true)
        else
          renders(false,{errors: todo_item.errors.full_messages})
        end
      end

      def update
        if @todo_item.update(todo_item_params)
          renders(true)
        else
          renders(false,{errors: @todo_item.errors.full_messages})
        end
      end

      private

        def todo_item_params
          params.fetch(:todo_item,{}).permit(
            :id, :description, :completed
          )
        end

        def find_todo_item
          @todo_item = TodoItem.find(params[:id])
        end
    end
  end
end
