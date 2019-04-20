class RepositoriesController < ApplicationController
  before_action :require_login
  before_action :set_repository, only: [:show, :edit, :update, :destroy]

  # GET /repositories
  # GET /repositories.json
  def index
    @username = current_user.username
    set_initial_variables
  end

  # GET /repositories/1
  # GET /repositories/1.json
  def show
    @authors = @repository.authors
    @username = current_user.username
    @chart = LazyHighCharts::HighChart.new('pie') do |f|
      f.chart({:defaultSeriesType=>"pie" ,
               :margin=> [50, 200, 60, 170]},

              )

      f.series(
          :type=> 'pie',
          :name=> 'percentage contribution',
          :data=> [
              ['Sam',   45.0],
              ['Pedro',       15.0],
              ['Juan',   30.0],
              ['Thomas',    5.0],
              ['Jeff',   5.0]
          ])
      f.legend(:layout=> 'vertical',:style=> {:left=> 'auto', :bottom=> 'auto',:right=> '50px',:top=> '100px'})
      f.plot_options(:pie=>{
          :allowPointSelect=>true,
          :cursor=>"pointer" ,
          :dataLabels=>{
              :enabled=>true,
              :color=>"black",
              :style=>{
                  :font=>"13px Trebuchet MS, Verdana, sans-serif"
              }
          }
      })
    end
    @data_in_series = []
    @authors.each do |author|
      @data_in_series.push([author.name, @repository.commits.where(author_username: author.username).sum(&:additions) + @repository.commits.where(author_username: author.username).sum(&:files_changed) ])
    end

    @chart2 = LazyHighCharts::HighChart.new('pie') do |c|
      c.chart(
          plotBackgroundColor: nil,
          plotBorderWidth: nil,
          plotShadow: false,
          type: 'pie'
      )
      c.title(
          text: 'Contributions to repo'
      )
      c.tooltip(
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      )
      #c.options[:chart][:height] = 800
      #c.options[:chart][:width] = 800
      c.plotOptions(
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  style: {
                      color: 'black'
                  }
              }
          }
      )
      c.series(
          :type=> 'pie',
          :name=> 'percentage contribution',
          :data=> @data_in_series
      )
    end
  end

  # GET /repositories/1/edit
  def edit
  end

  # POST /repositories
  # POST /repositories.json
  def create
    github = Octokit::Client.new access_token: current_user.oauth_token
    @repository = Repository.new(repository_params)
    repop = github.repo @repository.full_name
    if repop
      @name_repo = repop.full_name
      commits = github.commits @name_repo
      commits.each do |c|
        cTemp = github.commit @name_repo, c.sha
        commit = Commit.new
        #if Author not exists in that repository
        if !Author.where(username: cTemp.commit.author.email.to_s).any?
          author = Author.new
          author.username = cTemp.commit.author.email.to_s
          author.name = cTemp.commit.author.name.to_s
          author.repositories << @repository
          author.save
        else
          author = Author.where(username: cTemp.commit.author.email.to_s).first
          if !author.repositories.where(id: @repository.id).any?
            author.repositories << @repository
          end
          author.save
        end
        commit.message = cTemp.commit.message.to_s
        commit.additions = cTemp.stats.additions.to_i
        commit.deletions = cTemp.stats.deletions.to_i
        commit.files_changed = cTemp.files.count.to_i
        commit.author_username = Author.where(username: cTemp.commit.author.email.to_s).first.username
        commit.repository = @repository
        commit.save
      end
    else
      @name_repo = "nil"
    end

    Rails.logger.debug("My object: #{@rep.inspect}")

    #respond_to do |format|
     # if @repository.save
    #    format.html { redirect_to @repository, notice: 'Repository was successfully created.' }
    #    format.json { render :show, status: :created, location: @repository }
     # else
    #    format.html { render :new }
    #    format.json { render json: @repository.errors, status: :unprocessable_entity }
     # end
    #end
  end

  # PATCH/PUT /repositories/1
  # PATCH/PUT /repositories/1.json
  def update
    respond_to do |format|
      if @repository.update(repository_params)
        format.html { redirect_to @repository, notice: 'Repository was successfully updated.' }
        format.json { render :show, status: :ok, location: @repository }
      else
        format.html { render :edit }
        format.json { render json: @repository.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /repositories/1
  # DELETE /repositories/1.json
  def destroy
    @repository.destroy
    respond_to do |format|
      format.html { redirect_to repositories_path, notice: 'Repository was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_repository
    @repository = Repository.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def repository_params
    params.require(:repository).permit(:github_id, :url, :name, :full_name, :description, :size, :collaborator)
  end

  def set_initial_variables
    github = Octokit::Client.new access_token: current_user.oauth_token
    repos = Repository.all.to_a
    github.repos.each do |item|
      if !Repository.where(github_id: item.id).any?
        repo = Repository.new
        repo.github_id = item.id
        repo.url = item.html_url
        repo.name = item.name
        repo.full_name = item.full_name
        repo.description = item.description
        repo.size = item.size
        repo.collaborator = item.collaborator
        repos.push(repo)
      end
    end

    @repositories = repos
    @repo = Repository.new
    # @site = github.oauth.login
  end
end
