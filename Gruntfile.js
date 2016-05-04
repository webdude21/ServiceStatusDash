module.exports = function (grunt) {
  const target = '<%= project.target %>',
    packageTarget = '<%= pkg.name %>.zip',
    sourceFiles = '<%= project.src %>/**/*.js',
    targetFolder = '<%= project.target %>',
    allFiles = '**/*';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      root: 'src',
      target: 'target',
      src: '<%= project.root %>/scripts',
      optionsBundle: '<%= project.target %>/scripts/options-bundle.js',
      popupBundle: '<%= project.target %>/scripts/popup-bundle.js',
      views: '<%= project.root %>/views',
      img: '<%= project.root %>/img',
      libs: '<%= project.root %>/lib',
      css: '<%= project.root %>/styles'
    },
    compress: {
      main: {
        options: {
          archive: packageTarget
        },
        files: [
          { expand: true, cwd: '<%= project.root %>', src: [allFiles], dest: targetFolder }
        ]
      }
    },
    copy: {
      img: {
        files: [
          { expand: true, cwd: '<%= project.root %>', src: ['images/**/*'], dest: targetFolder }
        ]
      },
      css: {
        files: [
          { expand: true, cwd: '<%= project.root %>', src: ['styles/**/*'], dest: targetFolder }
        ]
      },
      views: {
        files: [
          { expand: true, cwd: '<%= project.root %>', src: ['views/**/*'], dest: targetFolder }
        ]
      },
      manifest: {
        files: [{
          expand: true,
          cwd: '<%= project.root %>',
          src: ['*.json'],
          dest: '<%= project.target %>'
        }]
      }
    },
    jsbeautifier: {
      files: ['<%= project.root %>/**/*', '!<%= project.img %>/**/*'],
      options: {
        config: '.jsbeautifyrc'
      }
    },
    browserify: {
      optionsBundle: {
        files: {
          '<%= project.optionsBundle %>': [sourceFiles, '!<%= project.src %>/controllers/popup.js']
        }
      },
      popupBundle: {
        files: {
          '<%= project.popupBundle %>': [sourceFiles, '!<%= project.src %>/controllers/options-page.js']
        }
      }
    },
    eslint: {
      app: [sourceFiles]
    },
    clean: {
      zip: {
        src: [packageTarget]
      },
      target: {
        src: [target]
      }
    },
    watch: {
      src: {
        files: ['<%= project.root %>/**/*'],
        tasks: ['default'],
        options: {
          livereload: true,
          debounceDelay: 250
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jsbeautifier', 'eslint', 'clean', 'browserify', 'copy']);
  grunt.registerTask('development', ['clean', 'browserify', 'copy']);
  grunt.registerTask('build', ['default', 'compress']);
};

