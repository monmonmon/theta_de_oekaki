class ThetaController < ApplicationController
  before_action :set_theta, only: [:show, :edit, :update, :destroy]
  protect_from_forgery except: :create

  def test
  end

  # GET /theta
  # GET /theta.json
  def index
    @theta = Theta.all
  end

  # GET /theta/1
  # GET /theta/1.json
  def show
  end

  # GET /theta/new
  def new
    @theta = Theta.new
  end

  # GET /theta/1/edit
  def edit
  end

  # POST /theta
  # POST /theta.json
  def create
    request_image = params[:image]
    url_hash = SecureRandom.urlsafe_base64(6)
    name = url_hash + "-" + request_image.original_filename.downcase

    File.open("public/theta/#{name}", 'wb') do |f|
      f.write(request_image.read)
    end

    theta = Theta.create!(url_hash: url_hash, image_url: name)
    render json: {url: "http://www.rakugaki.tk/h/#{theta.url_hash}"}, status: 201
  end

  # PATCH/PUT /theta/1
  # PATCH/PUT /theta/1.json
  def update
    respond_to do |format|
      if @theta.update(theta_params)
        format.html { redirect_to @theta, notice: 'Theta was successfully updated.' }
        format.json { render :show, status: :ok, location: @theta }
      else
        format.html { render :edit }
        format.json { render json: @theta.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /theta/1
  # DELETE /theta/1.json
  def destroy
    @theta.destroy
    respond_to do |format|
      format.html { redirect_to theta_url, notice: 'Theta was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_theta
      @theta = Theta.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def theta_params
#      params.require(:image).permit(:url_hash, :image_url)
      params.permit(:image, :url_hash, :image_url)
    end
end
