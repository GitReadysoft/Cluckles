module.exports = function (grunt) {
	// Setup
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			build: {
                // Theme Editor Files
				files: {
                    // The Destination file
					'build/bsThemeEditor-<%= pkg.version %>.min.js': [
                        // The Source files
						'src/<%= pkg.name %>/theme-modifier.js',
						'src/<%= pkg.name %>/branding.js',
						'src/<%= pkg.name %>/dropdown.js',
						'src/<%= pkg.name %>/form-state.js',
						'src/<%= pkg.name %>/gray-base.js',
						'src/<%= pkg.name %>/jumbotron.js',
						'src/<%= pkg.name %>/list-group.js',
						'src/<%= pkg.name %>/navbar.js',
						'src/<%= pkg.name %>/theme-modifier.js',
						'src/<%= pkg.name %>/theme-editor.js',
					]
				}
			}
		},
        
        // Create a localhost server to host the example demo
        express: {
            all: {
                // Host on localhost:9000
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    bases: [__dirname + '/build'], // Set the docroot to be the ./build folder
                    livereload: true
                },
            }
        },
        
        // Automatically open the path when Grunt is run
        open: {
            all: {
                path: "http://localhost:9000/example" // ./build/example (index.html)
            }
        },
        
        watch: {
            // Run the tasks when any of the example-src files are changed
            "example-src": {
                files: 'example-src/*.*',
                tasks: ["jshint", "uglify", "copy"],

                options: {
                  livereload: true
                }
            },
            
            // Reload the GruntFile.js when it is changed
            // TODO: Look into getting it to rerun the build process and start
            // watching again when this is done
            configFiles: {
                files: "GruntFile.js",
                options: {
                    reload: true
                }
            },
            
            // Run the tasks when the ThemeEditor JS files change
            scripts: {
                files: "src/BootstrapThemeEditor/*",
                tasks: ["jshint", "uglify", "copy"],
                options: {
                    livereload: true,
                }
            }
        },

        // Setup the Copy config to copy all the required files to the build/* folders
		copy: {
			main: {
				files: [
                    // Copy the Example files
                    {expand: true, src: "example-src/*", flatten: true, dest: 'build/example/'},

					// JS lib files
					{expand: true, src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/jquery/dist/jquery.min.map'], flatten: true, dest: 'build/js/lib'},
					{expand: true, src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'], flatten: true, dest: 'build/js/lib'},
                    {expand: true, src: ['bower_components/less.js/dist/less-1.7.3.min.js'], flatten: true, dest: 'build/js/lib'},
					
					// Bootstrap less files
					{expand: true, src: ['bower_components/bootstrap/less/*'], flatten: true, dest: 'build/less', filter: 'isFile'},
					{expand: true, src: ['bower_components/bootstrap/less/*'], flatten: true, dest: 'build/less', filter: 'isFile'},
                    
                    // Custom Bootstrap variables file
					{expand: true, src: 'src/variables-custom.less', flatten: true, dest: 'build/less/'},

                    // Copy the Custom Bootstrap.less file which adds the theme.less as an import
                    {expand: true, src: "src/bootstrap.less", flatten: true, dest: 'build/less/'},
				],
				options: {
                    // Replace "variables.less" with "variables-custom.less"
                    // the variables-custom.less file contains more/altered variables which makes it easier to
                    // cascade theme changes to multiple dependent elements
					process: function (content, srcpath) {
						return content.replace(/variables\.less/g, "variables-custom.less");
					}
				}
			}
		},

        // Turn on JShint for the Javascript files in src/BootstrapThemeEditor/
		jshint: {
			options: {
				jshintrc: true,
			},
			files: ['src/<%= pkg.name %>/*.js']
		}
	});
	
    // Load the Required Tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');

    // Register the "default" Task
	grunt.registerTask("default", ["jshint", "uglify", "copy", "express", "open", "watch"]);
};