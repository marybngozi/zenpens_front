const ErrorHandler = {
	install(Vue, options) {
		Vue.mixin({
			methods: {
				// 1. add global method or property
				reqErrorHandler ({e, message}) {
					// some logic ...
					console.log('from error handler', e);

					if(e.response && e.response.data.error){
						this.$toastr.e(message || e.response.data.error.message);
						return;
					}

					if(e.response && e.response.data.errors){
						const errorMessage = e.response.data.errors.join('.<br>')
						this.$toastr.e(message || errorMessage);
						return;
					}
				}
			}
		});	
	}
}

export default ErrorHandler;