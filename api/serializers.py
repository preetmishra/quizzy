from rest_framework import serializers

from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'password',
            'is_teacher',
            'is_student',
        ]
        read_only_fields = ['is_teacher', 'is_student']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            },
        }


class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = models.Teacher
        fields = ['user']

    def create(self, validated_data):
        user_data = validated_data.get('user')
        password = user_data.pop('password')

        user = models.User(**user_data)

        # Hash and set the password.
        if password is not None:
            user.set_password(password)

        # Make this user a Teacher.
        user.is_teacher = True

        user.save()
        teacher = models.Teacher.objects.create(user=user)
        return teacher

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})

        instance.user.username = user_data.get(
            'username',
            instance.user.username,
        )
        instance.user.first_name = user_data.get(
            'first_name',
            instance.user.first_name,
        )
        instance.user.last_name = user_data.get(
            'last_name',
            instance.user.last_name,
        )

        if 'password' in user_data:
            instance.user.set_password(user_data.get('password'))

        instance.user.save()
        return instance


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = models.Student
        fields = ['user']

    def create(self, validated_data):
        user_data = validated_data.get('user')
        password = user_data.pop('password')

        user = models.User(**user_data)

        # Hash and set the password.
        if password is not None:
            user.set_password(password)

        # Make this user a Student.
        user.is_student = True

        user.save()
        student = models.Student.objects.create(user=user)
        return student

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})

        instance.user.username = user_data.get(
            'username',
            instance.user.username,
        )
        instance.user.first_name = user_data.get(
            'first_name',
            instance.user.first_name,
        )
        instance.user.last_name = user_data.get(
            'last_name',
            instance.user.last_name,
        )

        if 'password' in user_data:
            instance.user.set_password(user_data.get('password'))

        instance.user.save()
        return instance


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['id', 'name', 'teacher']
        read_only_fields = ['teacher']


class QuizSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=models.Course.objects.all(),
    )

    class Meta:
        model = models.Quiz
        fields = ['course', 'name']


class QuestionSerializer(serializers.ModelSerializer):
    quiz = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=models.Quiz.objects.all(),
    )

    class Meta:
        model = models.Question
        fields = ['id', 'quiz', 'desc', 'points']


class AnswerSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=models.Question.objects.all(),
    )

    class Meta:
        model = models.Answer
        fields = ['id', 'question', 'option']


class CorrectAnswerSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=models.Question.objects.all(),
    )
    correct_option = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=models.Answer.objects.all(),
    )

    class Meta:
        model = models.Answer
        fields = ['id', 'question', 'correct_option']

    def create(self, validated_data):
        question = validated_data.get('question')
        correct_option = validated_data.get('correct_option')

        return models.CorrectAnswer.objects.create(
            question=question,
            correct_option=correct_option
        )
