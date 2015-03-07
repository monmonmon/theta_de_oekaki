class ThetaController < ApplicationController
  before_action :set_thetum, only: [:show, :edit, :update, :destroy]

  # GET /theta
  # GET /theta.json
  def index
    @theta = Thetum.all
  end

  # GET /theta/1
  # GET /theta/1.json
  def show
  end

  # GET /theta/new
  def new
    @thetum = Thetum.new
  end

  # GET /theta/1/edit
  def edit
  end

  # POST /theta
  # POST /theta.json
  def create
    @thetum = Thetum.new(thetum_params)

    respond_to do |format|
      if @thetum.save
        format.html { redirect_to @thetum, notice: 'Thetum was successfully created.' }
        format.json { render :show, status: :created, location: @thetum }
      else
        format.html { render :new }
        format.json { render json: @thetum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /theta/1
  # PATCH/PUT /theta/1.json
  def update
    respond_to do |format|
      if @thetum.update(thetum_params)
        format.html { redirect_to @thetum, notice: 'Thetum was successfully updated.' }
        format.json { render :show, status: :ok, location: @thetum }
      else
        format.html { render :edit }
        format.json { render json: @thetum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /theta/1
  # DELETE /theta/1.json
  def destroy
    @thetum.destroy
    respond_to do |format|
      format.html { redirect_to theta_url, notice: 'Thetum was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_thetum
      @thetum = Thetum.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def thetum_params
      params.require(:thetum).permit(:url_hash, :image_url)
    end
end
