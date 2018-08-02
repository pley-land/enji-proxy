module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      sitecss: {
        options: {
          banner: '/* My minified css file */'
        },
        files: {
          'dist/styles.min.css': [
            '../topShelf/public/styles.css',
            '../gallery/public/style.css',
            '../reviewList/client/dist/style.css'
          ]
        }
      }
    },
    uglify: {
      options: {
        compress: true
      },
      applib: {
        src: [
          '../topShelf/public/app.js',
          '../gallery/public/app.js',
          '../reviewList/client/dist/bundle.js'
        ],
        dest: 'dist/applib.js'
      }
    },
    aws: grunt.file.readJSON('aws-keys.json'),
  
    aws_s3: {
        options: {
            accessKeyId: '<%= aws.AWSAccessKeyId %>',
            secretAccessKey: '<%= aws.AWSSecretKey %>',
            region:'us-west-1',
            access:'bucket-owner-full-control',
        },
        dist: {
            options: {
                bucket: 'fec-static-anson'
            },
            files: [
              {
                action: 'upload',
                expand: true,
                cwd: 'dist/',
                src: ['applib.js', 'styles.min.css'],
                dest: '/app'
              }
            ]
        }
    }
  });

  grunt.registerTask("default", ["uglify", "cssmin", "aws_s3:dist"]); 
};