module.exports = function (grunt) {

  require('jit-grunt')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    path: {
      src: './src',
      dist: './dist'
    },

    clean: {
      all: ['<%= path.dist %>']
    },

    eslint: {
      options: {
      },
      target: [
        '<%= path.src %>/js/**/*.js'
      ]
    },

    assemble: {
      options: {
        layoutdir: '<%= path.src %>/layouts',
        partials: [
        ],
        helpers: [],
        plugins: []
      },
      all: {
        options: {
          layout: 'default.hbs'
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/pages',
            src: '**/*.hbs',
            dest: '<%= path.dist %>'
          }
        ]
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      all: {
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/scss',
            src: ['*.scss'],
            dest: '<%= path.dist %>/css',
            ext: '.css'
          }
        ]
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('stylelint')(),
          require('autoprefixer')(),
          require('postcss-normalize')(),
          require('cssnano')(),
          require('postcss-reporter')()
        ]
      },
      dist: {
        src: '<%= path.dist %>/css/*.css'
      }
    },

    browserify: {
      options: {
        browserifyOptions: {
          debug: true
        },
        standalone: 'MonoType',
        plugin: [
          [
            'minifyify'
          ]
        ],
        transform: [
          [
            'babelify',
            {
              'presets': ['es2015']
            }
          ],
          'deglobalify'
        ]
      },
      all: {
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/js',
            src: ['*.js'],
            dest: '<%= path.dist %>/js'
          }
        ]
      }
    },

    watch: {
      options: {
        spawn: false
      },
      html: {
        files: ['<%= path.src %>/**/*.hbs'],
        tasks: ['assemble']
      },
      scss: {
        files: ['<%= path.src %>/scss/**/*.scss'],
        tasks: ['sass']
      },
      css: {
        files: ['<%= path.dist %>/css/**/*.css'],
        tasks: ['postcss']
      },
      js: {
        files: ['<%= path.src %>/js/**/*.js'],
        tasks: ['browserify']
      }
    },

    browserSync: {
      all: {
        options: {
          watchTask: true,
          server: '<%= path.dist %>',
          open: false
        },
        bsFiles: {
          src: [
            '<%= path.dist %>/**/*.html',
            '<%= path.dist %>/css/*.css',
            '<%= path.dist %>/js/*.js'
          ]
        }
      }
    }
  });


  grunt.registerTask('default', ['clean', 'eslint']);
  grunt.registerTask('serve', ['clean', 'eslint', 'assemble', 'sass', 'postcss', 'browserify', 'browserSync', 'watch']);
  grunt.registerTask('build', ['clean', 'eslint', 'browserify']);
};
