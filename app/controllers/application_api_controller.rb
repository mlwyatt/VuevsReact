class ApplicationApiController < ActionController::API
  # Calls +render+ with the passed in options.
  #
  # <tt>:is_success</tt> - Boolean to say if the call succeeded or failed.
  # <tt>:options</tt> - Any other options that they want to send with the response call.
  # <tt>:render_options</tt> - Any render options that they want to use.
  #
  # ==== Examples
  #
  #   renders(true)
  #   # => render :json => {:success => true}, :layout => false, :status => 200
  #
  #   renders(true, {:id => 5})
  #   # => render :json => {:success => true, :id => 5}, :layout => false, :status => 200
  #
  #   renders(true, {}, {:status => 302})
  #   # => render :json => {:success => true}, :layout => false, :status => 302
  def renders(is_success, options = {}, render_options = {})
    render_options ||= {}
    render_options[:json] = (is_success.is_a?(Hash) ? is_success : {success: is_success}).merge(options||{})
    render_options[:layout] ||= false
    render_options[:status] ||= 200

    render render_options
  end
end
