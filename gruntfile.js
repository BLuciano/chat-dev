module.exports = function(grunt){

	// Configure Task(s)
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify:{
			build:{
				src: 'src/js/*.js',
				dest: 'js/app.min.js'
			},
			dev:{
				options:{
					beautify: true,
					mangle: false,
					compress: false,
					preserveComments: 'all'
				},
				src: 'src/js/*.js',
				dest: 'js/app.min.js'
			}
		},
		cssmin:{
			build:{
				files:[{
					expand: true,
					cwd: 'css',
					src: '*.css',
					dest: 'css',
					ext: '.min.css' 
				}]
			}
		},
		concat:{
			dev:{
				src: 'src/css/*.css',
				dest: 'css/styles.min.css'
			}
		},
		watch:{
			js:{
				files: ['src/js/*.js'],
				tasks: ['uglify:dev']
			},
			css:{
				files: ['src/css/*.css'],
				tasks: ['concat:dev']
			},
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Register Tasks
	grunt.registerTask('default', ['uglify:dev', 'concat:dev']);
	grunt.registerTask('build', ['uglify:build', 'cssmin:build']);
};