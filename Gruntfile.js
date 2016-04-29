'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    project: {
      app: 'public/src',
      build: 'public/compiled',
      root: './'
    },
    eslint: {
      app: ['Gruntfile.js', '<%= project.app %>/scripts/**/*.js']
    },
    copy: {
      img: {
        files: [
          { expand: true, cwd: '<%= project.app %>', src: ['img/**'], dest: '<%= project.build %>' }
        ]
      },
      favicon: {
        files: {
          '<%= project.build %>/favicon.ico': '<%= project.app %>/favicon.ico'
        }
      },
      js: {
        files: {
          '<%= project.build %>/scripts/build.min.js': '.tmp/min/scripts/build.min.js'
        }
      },
      css: {
        files: {
          '<%= project.build %>/styles/build.min.css': '.tmp/min/styles/build.min.css'
        }
      }
    },
    clean: {
      build: {
        src: ['.tmp', '<%= project.build %>']
      }
    },
    less: {
      build: {
        options: {
          strictMath: true,
          compress: false
        },
        files: [{
          expand: true,
          src: ['<%= project.app %>/styles/**/*.less'],
          ext: '.css',
          extDot: 'first'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.registerTask('build', ['eslint','clean', 'copy']);
};
