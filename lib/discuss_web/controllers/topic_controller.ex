defmodule DiscussWeb.TopicController do
  use DiscussWeb, :controller

  alias Discuss.Topic

  def new(conn, params) do
    changeset = Topic.changeset(%Topic{}, %{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"topic" => topic}) do
    changeset = Topic.changeset(%Topic{}, topic)
    case Discuss.Repo.insert(changeset) do
      {:ok, topic} -> IO.inspect(topic)
      {:error, changeset} ->
        render conn, "new.html", changeset: changeset
    end
  end
end
