# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_10_140522) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "authors", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "commits", force: :cascade do |t|
    t.string "message"
    t.string "author_username"
    t.integer "additions"
    t.integer "deletions"
    t.integer "files_changed"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "repository_id"
    t.date "created"
    t.string "github_sha"
    t.index ["repository_id"], name: "index_commits_on_repository_id"
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer "priority", default: 0, null: false
    t.integer "attempts", default: 0, null: false
    t.text "handler", null: false
    t.text "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string "locked_by"
    t.string "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "github_id"
    t.string "url"
    t.string "name"
    t.string "company"
    t.integer "public_repos"
    t.integer "private_repos"
    t.integer "total_repos"
    t.integer "collaborators"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "orgs_users", force: :cascade do |t|
    t.bigint "organization_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_orgs_users_on_organization_id"
    t.index ["user_id"], name: "index_orgs_users_on_user_id"
  end

  create_table "repositories", force: :cascade do |t|
    t.string "github_id"
    t.string "url"
    t.string "name"
    t.string "full_name"
    t.string "description"
    t.integer "size"
    t.boolean "collaborator"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id"
    t.index ["organization_id"], name: "index_repositories_on_organization_id"
  end

  create_table "repository_authors", force: :cascade do |t|
    t.bigint "repository_id"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_repository_authors_on_author_id"
    t.index ["repository_id"], name: "index_repository_authors_on_repository_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "avatar_url"
    t.string "email"
    t.string "uid"
    t.string "provider"
    t.string "oauth_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "commits", "repositories"
  add_foreign_key "orgs_users", "organizations"
  add_foreign_key "orgs_users", "users"
  add_foreign_key "repositories", "organizations"
  add_foreign_key "repository_authors", "authors"
  add_foreign_key "repository_authors", "repositories"
end
