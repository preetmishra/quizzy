from rest_framework import permissions


class UpdateTeacherAccount(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        """
        Checks whether the teacher is trying to edit their own account.
        """

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.user.is_teacher and obj.user.id == request.user.id


class UpdateStudentAccount(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        """
        Checks whether the student is trying to edit their own account.
        """

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.user.is_student and obj.user.id == request.user.id


class UpdateCourse(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        """
        Checks whether a teacher is trying to update their own course.
        """

        if request.method in permissions.SAFE_METHODS:
            return True

        return (obj.teacher.user.is_teacher
                and obj.teacher.user.id == request.user.id)


class UpdateQuiz(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        """
        Checks whether a teacher is trying to update their own quiz.
        """

        if request.method in permissions.SAFE_METHODS:
            return True

        return (obj.course.teacher.user.is_teacher
                and obj.course.teacher.user.id == request.user.id)


class UpdateQuestion(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        """
        Checks whether a teacher is trying to update their own questions.
        """

        if request.method in permissions.SAFE_METHODS:
            return True

        return (obj.quiz.course.teacher.user.is_teacher
                and obj.quiz.course.teacher.user.id == request.user.id)


class UpdateAnswer(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        """
        Checks whether a teacher is trying to update their own answers.
        """

        if request.method in permissions.SAFE_METHODS:
            return True

        return (
            obj.question.quiz.course.teacher.user.is_teacher
            and obj.question.quiz.course.teacher.user.id == request.user.id
        )


class UpdateCorrectAnswer(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        """
        Checks whether a teacher is trying to update their own correct answers.
        """

        if request.method in permissions.SAFE_METHODS:
            return True

        return (
            obj.question.quiz.course.teacher.user.is_teacher
            and obj.question.quiz.course.teacher.user.id == request.user.id
        )
